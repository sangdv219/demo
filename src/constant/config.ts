require('dotenv').config();
const env = process.env.RUN_ENV || 'develop';
const config = {
    local: {
        endpoint: "http://localhost:3000"
    },
    develop:{
        endpoint: "http://apiqlsxthuoc.blueskytech.vn"
    },
    production:{
        endpoint: ""
    }
}[env]
export {config}