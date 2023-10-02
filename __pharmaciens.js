const express = require('express')
const router = express.Router()
const connection = require('../../config/databases')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const formattedDate = require('../../utils/DateTime')
const saveBase64ImageToFile = require('../../utils/saveBase64ImageToFile')
const sendMail = require('../../utils/sendMail')

const { verifyCsrfToken } = require('../../middleware/verifyCsrfToken')
const saveErrors = require('../../utils/saveErrors')

// middleware
const verifyUser = (req, res, next) => {
    const jeton = req.headers.authorization?.split(' ')[1]
    if (!jeton) {
        return res.status(401).json({ message: 'Token missing' })
    }

    jwt.verify(jeton, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Server error'
            })
        }
        req.user = user
        next()
    })
}

//hashage des mot de passe
const hashPassword = async plainPassword => {
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(plainPassword, salt)
        return hashedPassword
    } catch (err) {}
}

// Fonction fléchée pour vérifier le mot de passe
const checkPassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
        return isMatch
    } catch (err) {}
}

// ---------------------------------------------------------------------------------------------------
// check auth
router.get('/check-login/', verifyCsrfToken, verifyUser, async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [
        req?.user?.user?.id
    ])
    const user = rows[0]
    res.json({
        data: req.cookies,
        res: user
    })
})

//logout
router.get('/logout/', (req, res) => {
    // Détruisez la session et supprimez le cookie
    req.session.destroy(err => {
        if (err) {
            saveErrors(err.message ?? '-', 'Pharmanciens.js', error.status ?? 0)
            return res.sendStatus(500)
        }
        res.clearCookie('token')
        res.json({ message: 'Logout successful' })
    })
})
// ----------------------------------------------------------------------------------------------------

router.post('/login/', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Veuillez remplir tous les champs svp!',
                status: 'failled'
            })
        }

        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Votre compte est introuvable'
            })
        }

        const user = rows[0]

        if (!user?.isActive) {
            return res.status(401).json({
                message:
                    "Votre compte est temporairement desactiver; Contacter l'administrateur."
            })
        }

        checkPassword(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const token = jwt.sign(
                        { user: user },
                        process.env.JWT_TOKEN,
                        {
                            expiresIn: '7d'
                        }
                    )

                    res.cookie('token', token, { httpOnly: true })
                    res.cookie = token
                    req.token = token
                    req.user = user

                    const users = {
                        access_id: user.access_id,
                        user: user.id,
                        name: user.name,
                        email: user.email,
                        telephone: user.telephone,
                        uuid: user.uuid,
                        profil: user.profil,
                        lastLogin: user.lastLogin
                    }

                    res.status(200).json({
                        message: 'Authentification réussie.',
                        token: token,
                        uuid: user.uuid,
                        users: users
                    })
                } else {
                    return res.status(401).json({
                        message: 'Email et/ou mot de passe incorrect'
                    })
                }
            })
            .catch(err => {
                return res.status(401).json({
                    message: "Une erreur s'est est survenue : " + err
                })
            })
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(500).json({
                message: error?.message
            })
        }
        saveErrors(error.message ?? '-', 'Pharmanciens.js', error.status ?? 0)
        res.status(500).json({
            message: error?.message ?? 'Erreur interne du serveur.'
        })
    }
})

router.post('/create-account/', async (req, res) => {
    try {
        const { name, email, numero, password } = req.body
        if (!name && !email && !numero && !password) {
            return res.status(400).json({
                message: 'Veuillez remplir tous les champs🖖'
            })
        }

        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (rows.length > 0) {
            return res
                .status(409)
                .json({ message: `Cet email ${email} est déjà utilisé` })
        }

        const [rows_n] = await connection.query(
            'SELECT * FROM users WHERE telephone = ?',
            [numero]
        )
        if (rows_n.length > 0) {
            return res
                .status(401)
                .json({ message: `${numero} est déjà utilisé` })
        }

        const uuid = uuidv4()
        hashPassword(password)
            .then(async hashedPassword => {
                await connection.query(
                    `INSERT INTO users(access_id, name, email, telephone, uuid, password, isActive, isLogin, created_at, updated_at) VALUES (2,'${name}', '${email}', '${numero}', '${uuid}', '${hashedPassword}', false, false, '${formattedDate}', '${formattedDate}')`
                )

                let m = `utilisateur <${name}-${email}> vient de creer un compte`
                const q = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`
                await connection.query(q, [m, formattedDate, formattedDate])

                const options = {
                    objet: 'Notification',
                    text: `utilisateur <${name}-${email}> vient de creer un compte`,
                    html: `<i>Utilisateur <${name}-${email}> vient de creer un compte</i>`
                }
                sendMail(options, '1000pharma@gmail.com')
                res.status(201).json({
                    message: 'Votre compte est crée avec succès',
                    uuid: uuid
                })
            })
            .catch(err => {
                console.log(err)
                res.status(401).json({
                    message:
                        'Une erreur est survenue lors de la creation nde votre compte.',
                    error: err?.message
                })
            })
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(401).json({
                message: 'Erreur : ' + error?.message
            })
        }
    }
})

router.post('/reset-forget-password/', async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: 'Veuillez remplir tous les champs svp!'
            })
        }

        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Votre compte est introuvable'
            })
        }

        const user = rows[0]
        const token = jwt.sign(
            { userId: user.id },
            '1000.pharma.JWT_TOKEN-reset-password-forget',
            {
                // expiresIn: '5m'
                expiresIn: '20m'
            }
        )
        const link = `<div>
            <p>Hello ${user.name}🫡;</p>
            cliquer ici <i>http://localhost:5173/set-new-password/${email}/${token}/</i> pour reinitialiser votre mor de passe.
            <p>Ce lien expire dans 20 minutes.</p>
            </div>`
        // envoi du mail
        const options = {
            objet: 'Reset passwoprd',
            text: link,
            html: link
        }
        sendMail(options, email)
        return res.status(200).json({
            message:
                '🫡Nous avons envoyé le lien de réinitialisation de votre mot de passe. Le lien expire dans 5 minbutes'
        })
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(500).json({
                message: error?.message ?? 'Erreur interne du serveur.'
            })
        }
        saveErrors(error.message ?? '-', 'Pharmanciens.js', error.status ?? 0)
        res.status(500).json({
            message: error?.message ?? 'Erreur interne du serveur.'
        })
    }
})

// checking-token-user-reset-password
router.post('/checking-token-user-reset-password/', async (req, res) => {
    try {
        const { email, token } = req.body

        if (!email) {
            return res.status(400).json({
                message: 'Veuillez remplir tous les champs svp!'
            })
        }
        var userInfo = ''
        jwt.verify(
            token,
            '1000.pharma.JWT_TOKEN-reset-password-forget',
            (err, user) => {
                if (err) {
                    return res.status(401).json({
                        data: 'invalid token'
                    })
                }
                userInfo = user
            }
        )

        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ? AND id = ?',
            [email, userInfo.userId]
        )
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Votre compte est introuvable'
            })
        }

        const user = rows[0]

        return res.status(200).json({
            message: 'success',
            data: {
                user: user.id,
                email: user.email
            }
        })
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(500).json({
                message: error?.message ?? 'Erreur interne du serveur.'
            })
        }
        saveErrors(error.message ?? '-', 'Pharmanciens.js', error.status ?? 0)
        res.status(500).json({
            message: error?.message ?? 'Erreur interne du serveur.'
        })
    }
})

// update-reset-password
router.put('/update-reset-password/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const { newPassword } = req.body

        if (!newPassword && !userId) {
            return res.status(400).json({
                message: 'Veuillez remplir tous les champs svp!'
            })
        }

        hashPassword(newPassword)
            .then(async hashedPassword => {
                await connection.query(
                    'SELECT * FROM users WHERE email = ? AND id = ?',
                    [hashedPassword, userId]
                )

                return res.status(200).json({
                    message: 'success'
                })
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Erreur est survenue',
                    error: err?.message
                })
            })
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(500).json({
                message: error?.message ?? 'Erreur interne du serveur.'
            })
        }
        saveErrors(error.message ?? '-', 'Pharmanciens.js', error.status ?? 0)
        res.status(500).json({
            message: error?.message ?? 'Erreur interne du serveur.'
        })
    }
})

router.post('/avec-ordonance/', async (req, res) => {
    try {
        const { nom, telephone, withLivraison, step, file } = req.body
        if (!nom && !telephone) {
            res.status(402).json({
                message: 'Veuillez remplir tous les champs svp, ...',
                status: error.status
            })
        }

        const [rows] = await connection.query(
            'SELECT * FROM clients WHERE phone = ?',
            [telephone]
        )

        const uuid = uuidv4()
        if (rows.length === 0) {
            // Enregistrement des information du client
            const client = `INSERT INTO clients(name, phone, uuid, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`
            const clientValue = [
                nom,
                telephone,
                uuid,
                formattedDate,
                formattedDate
            ]

            const [result] = await connection.query(client, clientValue)
            const newlyInsertedId = result.insertId

            const selectQuery = 'SELECT * FROM clients WHERE id = ?'
            const [rows] = await connection.query(selectQuery, [
                newlyInsertedId
            ])

            const client_id = rows[0]['id']

            // Usage example=====================================================================
            const base64String = file // Replace this with your actual Base64 string
            const filePath = `./uploads/${uuid}.jpg` // Replace this with the desired file path
            // ===================================================================================

            // Enregistrement de l'ordonance
            const ordonance = `INSERT INTO ordonances (client_id, file_ordonance, uuid, isLivraisonAtHome, created_at, updated_at) VALUES('${client_id}', '${filePath}', '${uuid}', ${withLivraison}, '${formattedDate}', '${formattedDate}')`

            await connection.query(ordonance)
            saveBase64ImageToFile(base64String, filePath)

            // let m = `${nom} vient d'envoyer une ordonances avec livraison`
            // const q = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`
            // await connection.query(q, [m, formattedDate, formattedDate])

            const options = {
                objet: 'Reset passwoprd',
                text: `${nom} vient d'envoyer une ordonances avec livraison`,
                html: `<i>${nom} vient d'envoyer une ordonances avec livraison</i>`
            }
            sendMail(options, 'cntpc1000@gmail.com')
            res.status(201).json({
                message:
                    'Ordonance reçu avec succès. Nous allons vous contacter sur votre numéro whatsapp.',
                data: []
            })
        } else {
            const selectQuery = 'SELECT * FROM clients WHERE phone = ?'
            const [rows] = await connection.query(selectQuery, [telephone])

            const client_id = rows[0]['id']

            // Usage example=====================================================================
            const base64String = file // Replace this with your actual Base64 string
            const filePath = `./uploads/${uuid}.jpg` // Replace this with the desired file path
            // ===================================================================================

            // Enregistrement de l'ordonance
            const ordonance = `INSERT INTO ordonances (client_id, file_ordonance, uuid, isLivraisonAtHome, created_at, updated_at) VALUES('${client_id}', '${filePath}', '${uuid}', ${withLivraison}, '${formattedDate}', '${formattedDate}')`

            await connection.query(ordonance)
            saveBase64ImageToFile(base64String, filePath)

            // let m = `${nom} vient d'envoyer une ordonances avec livraison`
            // const q = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`
            // await connection.query(q, [m, formattedDate, formattedDate])

            const options = {
                objet: 'Reset passwoprd',
                text: `${nom} vient d'envoyer une ordonances avec livraison`,
                html: `<i>${nom} vient d'envoyer une ordonances avec livraison</i>`
            }
            sendMail(options, 'cntpc1000@gmail.com')

            res.status(201).json({
                message:
                    'Ordonance reçu avec succès. Nous allons vous contacter sur votre numéro whatsapp.',
                data: []
            })
        }
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(400).json({
                message: error.message,
                status: error.status
            })
        }
    } finally {
        res.status(400).json({
            message: 'Connexion closed'
        })
    }
})

router.get('/avec-ordonance/', async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM ordonances'
        const [rows] = await connection.query(selectQuery)

        const data = rows
        res.status(200).json({
            message: 'data reçu avec succès.',
            status: 'success',
            data: data
        })
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(400).json({
                message: error.message,
                status: error.status
            })
        }
    } finally {
        // Fermer la connexion à la base de données lorsque vous avez terminé
        // connection.end()
        res.status(400).json({
            message: 'Error message'
        })
    }
})

router.post('/sans-ordonance/', async (req, res) => {
    try {
        const formData = req.body
        const uuid = uuidv4()
        if (
            !formData.name &&
            !formData.numero &&
            !formData.adresse &&
            !formData.symptome &&
            !formData.isPregnant &&
            !formData.sex &&
            !formData.weight &&
            formData.Livrable
        ) {
            res.status(404).json({
                message: 'Veuillez remplir tous les champs svp!',
                status: 'error'
            })
        }

        const {
            name,
            numero,
            adresse,
            symptome,
            isPregnant,
            sex,
            weight,
            Livrable
        } = req.body
        if (!name && !numero && !adresse && !symptome && !Livrable) {
            res.status(402).json({
                message: 'Veuillez remplir tous les champs svp, ...',
                status: error.status
            })
        }

        const [rows] = await connection.query(
            'SELECT * FROM clients WHERE phone = ?',
            [numero]
        )

        if (rows.length === 0) {
            // Enregistrement des information du client
            const client = `INSERT INTO clients(name, phone, adresse, uuid, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`

            const clientValue = [
                name,
                numero,
                adresse,
                uuid,
                formattedDate,
                formattedDate
            ]

            const [result] = await connection.query(client, clientValue)
            const newlyInsertedId = result.insertId

            const selectQuery = 'SELECT * FROM clients WHERE id = ?'
            const [rows] = await connection.query(selectQuery, [
                newlyInsertedId
            ])
            const client_id = rows[0]['id']
            const q = `INSERT INTO symptomes_clients (client_id, Livrable, symptome, isPregnant, sex, weight, uuid, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?)`
            const Value = [
                client_id,
                Livrable == '1' ? true : false,
                symptome,
                sex == 'male' ? false : isPregnant,
                sex,
                weight,
                uuid,
                formattedDate,
                formattedDate
            ]
            await connection.query(q, Value)

            let m = `${name} vient d'envoyer une ordonances manuscrit avec ses diagnostics`
            const query = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`
            await connection.query(query, [m, formattedDate, formattedDate])

            const options = {
                objet: 'Reset passwoprd',
                text: `${name} vient d'envoyer une ordonances manuscrit avec ses diagnostics`,
                html: `<i>${name} vient d'envoyer une ordonances manuscrit avec ses diagnostics</i>`
            }
            sendMail(options, 'cntpc1000@gmail.com')

            res.status(200).json({
                message: 'votre demande a ete recu succès',
                status: 'success',
                data: formData
            })
        } else {
            const client_id = rows[0]['id']
            const q = `INSERT INTO symptomes_clients (client_id, Livrable, symptome, isPregnant, sex, weight, uuid, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?)`
            const Value = [
                client_id,
                Livrable == '1' ? true : false,
                symptome,
                sex == 'male' ? false : isPregnant,
                sex,
                weight,
                uuid,
                formattedDate,
                formattedDate
            ]
            await connection.query(q, Value)

            let m = `${name} vient d'envoyer une ordonances manuscrit avec ses diagnostics`
            const query = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`
            await connection.ueryuery(query, [m, formattedDate, formattedDate])

            const options = {
                objet: 'Reset passwoprd',
                text: `${name} vient d'envoyer une ordonances manuscrit avec ses diagnostics`,
                html: `<i>${name} vient d'envoyer une ordonances manuscrit avec ses diagnostics</i>`
            }
            sendMail(options, 'cntpc1000@gmail.com')

            res.status(200).json({
                message: 'votre demande a ete recu succès',
                status: 'success',
                data: formData
            })
        }
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(500).json({
                message: error.message,
                status: error.status
            })
        }
        saveErrors(error.message ?? '-', 'Pharmanciens.js', error.status ?? 0)
        res.status(500).json({
            message: error?.message ?? 'Erreur'
        })
    }
})

//  =================*******************  ROUTES AVEC LE LOGIN ************========================*/
router.get(
    '/medicaments/:id_my_id',
    verifyCsrfToken,
    verifyUser,
    async (req, res) => {
        try {
            const { id_my_id } = req.params
            if (!id_my_id) {
                res.status(403).json({
                    message: 'Veuillez remplir tous les donnees svp.',
                    status: 'failled'
                })
            }
            const query = `SELECT * FROM stock_medocs WHERE user_id=${id_my_id}`
            const data = await connection.query(query)
            res.status(200).json({
                message: 'Données récuperées avec succès',
                status: 'success',
                data: data[0]
            })
        } catch (error) {
            if (error) {
                saveErrors(
                    error.message ?? '-',
                    'Pharmanciens.js',
                    error.status ?? 0
                )
                res.status(403).json({
                    message: error.message,
                    status: error.status
                })
            }

            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(403).json({
                message: error?.message ?? 'Erreur',
                status: error.status
            })
        }
    }
)

router.post('/medicaments/', verifyCsrfToken, verifyUser, async (req, res) => {
    try {
        const { medicament, quantite, file_medicament, id, price } = req.body

        if (!medicament && !quantite && !file_medicament && !id && price) {
            res.status(404).json({
                message: 'Veuillez remplir tous les champs svp!',
                status: 'error'
            })
        }

        const uuid = uuidv4()

        const query = `INSERT INTO stock_medocs (user_id, medicament, quantite, price, photo_medicament, uuid, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

        // Usage example=====================================================================
        const base64String = file_medicament // Replace this with your actual Base64 string
        const filePath = `./uploads/${uuid}.jpg` // Replace this with the desired file path
        // ===================================================================================

        const values = [
            id,
            medicament,
            quantite,
            price,
            filePath,
            uuid,
            formattedDate,
            formattedDate
        ]

        await connection.query(query, values)

        let m = `une nouvelle medoc vient d'etre ajouter dans le stock`
        const q = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`
        await connection.query(q, [m, formattedDate, formattedDate])

        const options = {
            objet: 'Reset passwoprd',
            text: `une nouvelle medoc vient d'etre ajouter dans le stock`,
            html: `<i>une nouvelle medoc vient d'etre ajouter dans le stock</i>`
        }
        sendMail(options, 'cntpc1000@gmail.com')

        saveBase64ImageToFile(base64String, filePath)
        res.status(200).json({
            message: 'Données insérées avec succès',
            data: values
        })
    } catch (error) {
        if (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(406).json({
                message: error.message,
                status: error.status
            })
        }
        saveErrors(error.message ?? '-', 'Pharmanciens.js', error.status ?? 0)
        res.status(406).json({
            message: 'Erreur'
        })
    }
})

//update-user-infos
router.put(
    '/update-user-infos/',
    verifyCsrfToken,
    verifyUser,
    async (req, res) => {
        try {
            const { name, email, numero, user_id } = req.body
            if (!name && !email && !numero && !user_id) {
                return res.status(400).json({
                    message: 'Veuillez remplir tous les champs requis'
                })
            }
            const query = `UPDATE users SET name='${name}', email='${email}', telephone='${numero}' WHERE id=${user_id}`
            const d = await connection.query(query)

            const [rows] = await connection.query(
                `SELECT * FROM users WHERE id=${user_id}`
            )
            if (rows.length === 0) {
                return res.status(401).json({
                    message: 'Votre compte est introuvable',
                    status: 'failled'
                })
            }

            const user = rows[0]
            // const users = {
            //     access_id: user.access_id,
            //     user: user.id,
            //     name: user.name,
            //     email: user.email,
            //     telephone: user.telephone,
            //     uuid: user.uuid,
            //     profil: user.profil,
            //     lastLogin: user.lastLogin
            // }

            res.status(201).json({
                message: 'User info updated successfully',
                token: user.token,
                uuid: user.uuid,
                users: user
            })
        } catch (error) {
            if (error) {
                saveErrors(
                    error.message ?? '-',
                    'Pharmanciens.js',
                    error.status ?? 0
                )
                res.status(401).json({
                    message:
                        "Une erreur est survenue lors de l'enregistrement de l'utilisateur : " +
                        error,
                    status: error.status
                })
            }
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(401).json({
                message:
                    "Une erreur est survenue lors de l'enregistrement de l'utilisateur : ",
                status: error.status
            })
        }
    }
)

//update-user-infos-password
router.put(
    '/update-user-infos-password/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { pwd, pwd2, user_id } = req.body
            if (!pwd && !pwd2 && !user_id) {
                return res.status(400).json({
                    message: 'Veuillez remplir tous les champs requis',
                    status: 'error'
                })
            }
            if (pwd == pwd2) {
                hashPassword(pwd)
                    .then(async hash => {
                        const query = `UPDATE users SET password=? WHERE id=?`
                        await connection.query(query, [hash, user_id])

                        res.status(201).json({
                            message: 'Votre mot de passe changeé avec succès'
                        })
                    })
                    .catch(err => {
                        res.status(401).json({
                            message: 'Une erreur est survenue.',
                            errors: err?.message
                        })
                    })
            } else {
                res.status(201).json({
                    message: 'le s deux mot de passent ne correspodent pas.',
                    uuid: uuid
                })
            }
        } catch (error) {
            if (error) {
                res.status(401).json({
                    message: error?.message
                })
            }
            res.status(401).json({
                message: error?.message
            })
        }
    }
)

//update-user-profil
router.put(
    '/update-user-profil/',
    verifyCsrfToken,
    verifyUser,
    async (req, res) => {
        try {
            const { files, user_id } = req.body
            if (!files && !user_id) {
                return res.status(400).json({
                    message: 'Veuillez remplir tous les champs requis',
                    status: 'error'
                })
            }
            const uuid = uuidv4()

            const base64String = files
            const filePath = `./uploads/${uuid}.jpg`

            const query = `UPDATE users SET profil='${filePath}' WHERE id=${user_id}`
            await connection.query(query)

            const [rows] = await connection.query(
                `SELECT * FROM users WHERE id=${user_id}`
            )
            if (rows.length === 0) {
                return res.status(401).json({
                    message: 'Votre compte est introuvable',
                    status: 'failled'
                })
            }

            const user = rows[0]

            // notification('update informations profile')
            saveBase64ImageToFile(base64String, filePath)
            res.status(201).json({
                message: 'User updated successfully',
                token: user.token,
                uuid: user.uuid,
                userId_1000pharma: user
            })
        } catch (error) {
            saveErrors(
                error.message ?? '-',
                'Pharmanciens.js',
                error.status ?? 0
            )
            res.status(401).json({
                message: 'Erreur : ' + error?.message
            })
        }
    }
)
// *==============================================================================================*/

module.exports = router
