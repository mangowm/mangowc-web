import { type InferPageType, loader } from "fumadocs-core/source";
import { docs } from "fumadocs-mdx:collections/server";

export const source = loader(docs.toFumadocsSource(), {
	baseUrl: "/docs",
});

export type Page = InferPageType<typeof source>;
