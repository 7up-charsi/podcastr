import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs';
import {} from '@clerk/backend';
import { CustomLoader } from '@/components/custom-loader';

const SignUpPage = () => {
  return (
    <>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>

      <ClerkLoading>
        <CustomLoader size={48} className="text-white" />
      </ClerkLoading>
    </>
  );
};

export default SignUpPage;
