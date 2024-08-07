declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"homepage": {
"index.mdoc": {
	id: "index.mdoc";
  slug: "index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".mdoc"] };
};
"pages": {
"about.mdoc": {
	id: "about.mdoc";
  slug: "about";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"contactme.mdoc": {
	id: "contactme.mdoc";
  slug: "contactme";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"digital-art.mdoc": {
	id: "digital-art.mdoc";
  slug: "digital-art";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
"traditional-art.mdoc": {
	id: "traditional-art.mdoc";
  slug: "traditional-art";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdoc"] };
};
"portfolioGroups": {
"all.mdoc": {
	id: "all.mdoc";
  slug: "all";
  body: string;
  collection: "portfolioGroups";
  data: InferEntrySchema<"portfolioGroups">
} & { render(): Render[".mdoc"] };
"digital.mdoc": {
	id: "digital.mdoc";
  slug: "digital";
  body: string;
  collection: "portfolioGroups";
  data: InferEntrySchema<"portfolioGroups">
} & { render(): Render[".mdoc"] };
"traditional.mdoc": {
	id: "traditional.mdoc";
  slug: "traditional";
  body: string;
  collection: "portfolioGroups";
  data: InferEntrySchema<"portfolioGroups">
} & { render(): Render[".mdoc"] };
};
"projects": {
"cartooncatportrait.mdoc": {
	id: "cartooncatportrait.mdoc";
  slug: "cartooncatportrait";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"falconredesign.mdoc": {
	id: "falconredesign.mdoc";
  slug: "falconredesign";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"figuredraw.mdoc": {
	id: "figuredraw.mdoc";
  slug: "figuredraw";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"landscape1.mdoc": {
	id: "landscape1.mdoc";
  slug: "landscape1";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"landscapestormking.mdoc": {
	id: "landscapestormking.mdoc";
  slug: "landscapestormking";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"laphil.mdoc": {
	id: "laphil.mdoc";
  slug: "laphil";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"magazinecyber.mdoc": {
	id: "magazinecyber.mdoc";
  slug: "magazinecyber";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"mastercopy.mdoc": {
	id: "mastercopy.mdoc";
  slug: "mastercopy";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"natures-keepers.mdoc": {
	id: "natures-keepers.mdoc";
  slug: "natures-keepers";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"selfportrait.mdoc": {
	id: "selfportrait.mdoc";
  slug: "selfportrait";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"soyuzivka-heritage-center.mdoc": {
	id: "soyuzivka-heritage-center.mdoc";
  slug: "soyuzivka-heritage-center";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"teabranding.mdoc": {
	id: "teabranding.mdoc";
  slug: "teabranding";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
"vinylalbum.mdoc": {
	id: "vinylalbum.mdoc";
  slug: "vinylalbum";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
