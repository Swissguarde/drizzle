import { auth } from "@/firebase/clientApp";
import useAuthModal from "@/hooks/useAuthModal";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdClose } from "react-icons/io";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const { isOpen, onClose, view } = useAuthModal();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      onClose();
      console.log("userHere", user);
    }
  }, [user]);

  return (
    <Transition appear show={isOpen ? true : false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="modal-slide-up-enter"
              enterFrom="modal-slide-up-enter"
              enterTo="modal-slide-up-enter-active"
              leave="modal-slide-up-leave"
              leaveFrom="modal-slide-up-leave-active"
              leaveTo="modal-slide-up-leave-active"
            >
              <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 shadow-xl transition-all gap-5 modal-slide-up scrollbar-none">
                <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                  <button onClick={onClose}>
                    <IoMdClose size={26} />
                  </button>
                  <div className="text-xl text-center font-semibold">
                    {view === "login" && "Log In"}
                    {view === "signup" && "Sign Up"}
                    {view === "resetPassword" && "Reset Password"}
                  </div>
                  <div></div>
                </div>

                <div className="pb-4">
                  {view === "login" || view === "signup" ? (
                    <>
                      <AuthInputs />
                      <OAuthButtons />
                    </>
                  ) : (
                    <ResetPassword />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default AuthModal;
