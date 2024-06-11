import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import {} from '@clerk/backend';
import { CustomLoader } from '@/components/custom-loader';

const SignInPage = () => {
  return (
    <>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>

      <ClerkLoading>
        <CustomLoader size={48} className="text-white" />
      </ClerkLoading>
    </>
  );
};

export default SignInPage;
