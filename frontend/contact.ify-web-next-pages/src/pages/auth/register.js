import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";

const Register = () => {
  return (
    <div>
      <p>
        Already have an account?
        <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
};

Register.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Register;
