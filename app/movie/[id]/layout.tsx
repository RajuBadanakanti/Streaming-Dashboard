// app/movie/[id]/layout.tsx
export const metadata = {
  title: "Loading Movie...",
};

export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}