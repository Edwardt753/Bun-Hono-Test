type Dialect = any;

// to force env variable to absolute string
declare module "bun" {
  interface Env {
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
    DB_PORT: string;
  }
}

// declaring types
interface DB_Config {
  database: string;
  username: string;
  password: string;
  options: {
    host: string;
    port: number;
    dialect: Dialect;
    timezone: string;
    logging: boolean;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };
}

// real configuration in here
const dbConfig: DB_Config = {
  database: Bun.env.DB_NAME,
  username: Bun.env.DB_USER,
  password: Bun.env.DB_PASS,
  options: {
    host: Bun.env.DB_HOST,
    port: parseInt(Bun.env.DB_PORT, 10),
    dialect: "mysql",
    timezone: "+07:00",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30 * 1000, // in miliseconds
      idle: 10 * 1000,
    },
  },
};

export default dbConfig;
