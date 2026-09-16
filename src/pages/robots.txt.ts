import { GetServerSideProps } from "next";

function RobotsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const isProduction = process.env.PRODUCTION === "1";

  res.setHeader("Content-Type", "text/plain");
  res.write(isProduction ? "User-agent: *\nAllow: /" : "User-agent: *\nDisallow: /");
  res.end();

  return { props: {} };
};

export default RobotsTxt;
