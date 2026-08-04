import Image from "next/image";
import { existsSync } from "fs";
import path from "path";
import { siteConfig } from "@/data/site";

export function ProfileAvatar({
  size = 96,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const profilePath = path.join(
    process.cwd(),
    "public",
    siteConfig.profileImage.path.replace(/^\//, ""),
  );
  const hasImage = existsSync(profilePath);

  if (hasImage) {
    return (
      <Image
        src={siteConfig.profileImage.path}
        alt={`${siteConfig.name} profile photo`}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
        priority
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full border border-border bg-accent-muted text-accent-fg ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${siteConfig.name} avatar`}
      role="img"
    >
      <span className="text-2xl font-medium tracking-tight">M</span>
    </div>
  );
}
