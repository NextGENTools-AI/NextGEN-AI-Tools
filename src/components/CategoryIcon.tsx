import {
  BrainIcon, ImageIcon, CodeIcon, PenIcon, VideoIcon,
  ChartIcon, BotIcon, ZapIcon, BriefcaseIcon, SearchIcon,
  MicIcon, VolumeIcon, MusicIcon, PaletteIcon, LayoutIcon,
  UsersIcon, TrendingUpIcon, TerminalIcon, CalendarIcon,
  MailIcon, ScaleIcon, DollarIcon, GlobeIcon, HeadphonesIcon,
  HeartIcon, CpuIcon, BarChartIcon,
} from './Icons';

type CategoryIconComponent = React.FC<{ size?: number; className?: string }>;

/**
 * Single source of truth for mapping a category's `icon` field
 * (see data/tools.ts) to its icon component.
 */
const iconMap: Record<string, CategoryIconComponent> = {
  pen: PenIcon,
  bot: BotIcon,
  code: CodeIcon,
  image: ImageIcon,
  video: VideoIcon,
  mic: MicIcon,
  volume: VolumeIcon,
  music: MusicIcon,
  chart: ChartIcon,
  'bar-chart': BarChartIcon,
  brain: BrainIcon,
  briefcase: BriefcaseIcon,
  search: SearchIcon,
  zap: ZapIcon,
  palette: PaletteIcon,
  layout: LayoutIcon,
  users: UsersIcon,
  'trending-up': TrendingUpIcon,
  terminal: TerminalIcon,
  calendar: CalendarIcon,
  mail: MailIcon,
  scale: ScaleIcon,
  'dollar-sign': DollarIcon,
  globe: GlobeIcon,
  headphones: HeadphonesIcon,
  heart: HeartIcon,
  cpu: CpuIcon,
};

export default function CategoryIcon({ icon, size = 22, className }: { icon: string; size?: number; className?: string }) {
  const Icon = iconMap[icon] ?? BrainIcon;
  return <Icon size={size} className={className} />;
}
