import Image from 'next/image';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;

  return (
    <main className="relative h-screen w-full">
      <div className="absolute inset-0">
        <Image
          src="/auth-bg-img.png"
          fill
          alt="bg-image"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="flex h-screen w-full items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
