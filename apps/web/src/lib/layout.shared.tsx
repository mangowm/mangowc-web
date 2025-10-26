import Image from "next/image";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

const logo = (
	<Image
		alt="MangoWC"
		src="/logo-32x32.png"
		width={32}
		height={32}
		className="size-5"
	/>
);

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<>
					{logo}
					<span className="font-medium max-md:hidden">MangoWC</span>
				</>
			),
		},
	};
}
