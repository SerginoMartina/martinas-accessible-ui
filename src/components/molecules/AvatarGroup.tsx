import { Avatar } from '../atoms/Avatar';
import type { AvatarProps } from '../atoms/Avatar';

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  label?: string;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

export function AvatarGroup({
  avatars,
  label = 'People',
  max = avatars.length,
  size = 'md',
  className = '',
}: AvatarGroupProps) {
  const visible = avatars.slice(0, Math.max(0, max));
  const remaining = Math.max(0, avatars.length - visible.length);

  return (
    <ul aria-label={label} className={`flex items-center -space-x-2 ${className}`}>
      {visible.map((avatar, index) => (
        <li key={`${avatar.alt}-${index}`} className="rounded-full ring-2 ring-white">
          <Avatar {...avatar} size={avatar.size ?? size} />
        </li>
      ))}
      {remaining > 0 && (
        <li
          role="img"
          aria-label={`${remaining} additional ${remaining === 1 ? 'person' : 'people'}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white ring-2 ring-white"
        >
          +{remaining}
        </li>
      )}
    </ul>
  );
}
