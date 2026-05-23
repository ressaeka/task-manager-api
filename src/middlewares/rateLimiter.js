import rateLimit from 'express-rate-limit'

// Limiter untuk login (5x dalam 15 menit)
export const loginLimiter = rateLimit ({
    windowMs : 15 * 60 * 1000,
    max : 5,
    message : {
        status: 'fail',
        message: 'Terlalu banyak percobaan login, Coba lagi setelah 15 menit.'
    },
    standardHeaders:true,
    legacyHeaders: false

});

// Limiter untuk register (5x dalam 1 jam)
export const registerLimiter = rateLimit ({
    windowMs : 60 * 60 * 1000,
    max : 5, 
    message : {
        status: 'fail',
        message: 'Terlalu banyak percobaan Register, Coba lagi setelah 1 jam.'
    },
    standardHeaders :true,
    legacyHeaders: false
})

// Limiter untuk api umum (500x dalam 1 menit - safety net aja)
export const apiLimiter = rateLimit({
    windowMs : 60 * 1000,
    max: 500,
    message: {
        status: 'fail',
        message: 'Terlalu banyak request, Coba lagi setelah 1 menit.'
    },
    standardHeaders :true,
    legacyHeaders: false,
    skip: (req) => req.method === 'OPTIONS'
})

// limiter untuk api admin(300x dalam 1 menit)
export const adminLimiter  = rateLimit ({
    windowMs : 60 * 1000,
    max : 300,
    message : {
        status:'fail',
        message:'Terlalu banyak request, Coba lagi setelah 1 menit.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'OPTIONS'
})

