import {Header} from 'src/components';

export function BaseLayout({children}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
