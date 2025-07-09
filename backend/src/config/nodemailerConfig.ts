import config from "./config";

const { user, pass, host, port } = config.mail;

const nodemailerConfig = {
  host,
  port: Number(port),
  secure: true,
  auth: { user, pass },
};

export default nodemailerConfig;
