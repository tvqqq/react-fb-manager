import LoginButton from "../components/auth/LoginButton";
import LogoutButton from "../components/auth/LogoutButton";

const Header = ({ user }) => {
  return (
    <>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        React FB Manager
      </p>
      <div className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        {!user && <LoginButton />}
        {user && (
          <div className="flex flex-col">
            Hello, {user.nickname}
            <LogoutButton />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
