import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function Blog(props: PageProps) {
  const { slug } = props.params;
  return (
    <>
      <h1>Blog Page</h1>
      <h2>post:{slug}</h2>
    </>
  );
}
