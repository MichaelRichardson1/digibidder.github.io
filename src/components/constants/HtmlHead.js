import Head from "next/head";
import { SITE_TITLE } from "./site";

export default function HtmlHead({ title = "" }) {
    return (
        <Head>
            <title>
                {title}
                {title ? " | " : ""}
                {SITE_TITLE}
            </title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}