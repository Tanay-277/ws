import { memo } from "react";

interface SectionHeaderProps {
	title: string;
	children: React.ReactNode;
}

export const SectionHeader = memo<SectionHeaderProps>(({ title, children }) => (
	<header className="w-full bg-accent/50 p-4 flex items-center justify-between">
		<h2 className="text-lg font-medium">{title}</h2>
		<div className="flex items-center gap-3">{children}</div>
	</header>
));

SectionHeader.displayName = "SectionHeader";
