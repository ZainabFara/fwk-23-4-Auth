import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Docummentation for a school project",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>Doumentation for our first Auth server.</>,
  },
  {
    title: "Roll-Based Access control (RBAC) ",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>We learned how to implement RBAC in SPA.</>,
  },
  {
    title: "Loggin",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>We learned diffrent kinds of Logging.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
