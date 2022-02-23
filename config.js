const CONFIG = {
    "development": {
        "port": 8080,
        "db_url": "",
        "JWT_KEY": ""
    },
    "production": {
        "port": 80,
        "db_url": "",
        "JWT_KEY": ""
    }
}
let env = process.argv[2] || "production";
export default CONFIG[env];