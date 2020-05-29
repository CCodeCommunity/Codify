import Knex, { Config } from "knex";

import * as config from "../knexfile";

const environment = process.env.NODE_ENV || "development";
const environmentConfig = (config as Record<string, Config>)[environment];

const knex = Knex(environmentConfig as Config);

export default knex;
