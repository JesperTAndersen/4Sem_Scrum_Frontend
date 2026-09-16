import styles from "./UserProfilePage.module.css";
import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import LoadingSpinner from "@/shared/components/ui/LoadingSpinner/LoadingSpinner";
import PageHeader from "@/shared/components/layout/PageHeader/PageHeader";
import userService from "../../services/userService";
import ProfileSummary from "../../components/ProfileSummary/ProfileSummary";
import ChangeEmailForm from "../../components/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";

const UserProfilePage = () => {
  const { notify } = useNotification();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await userService.getMe();
        setProfileData(data);
      } catch (error) {
        notify("error", error.message || "Kunne ikke hente din profil");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEmailUpdate = async (email) => {
    try {
      const updated = await userService.changeEmail(profileData.id, email);
      setProfileData(updated);
      notify("success", "Din email er blevet opdateret");
    } catch (error) {
      notify("error", error.message || "Kunne ikke opdatere email");
    }
  };

  const handlePasswordUpdate = async (formData) => {
    await userService.changePassword(profileData.id, {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    notify("success", "Din adgangskode er blevet ændret");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <PageHeader
          title="Min Profil"
          subtitle="Administrer din konto og sikkerhed"
        />

        {isLoading || !profileData ? (
          <LoadingSpinner text="Henter bruger information..." inline />
        ) : (
          <>
            <div className={styles.contentWrapper}>
              <ProfileSummary profileData={profileData} />

              <ChangeEmailForm
                onSubmit={handleEmailUpdate}
                currentEmail={profileData.email}
              />

              <ChangePasswordForm onSubmit={handlePasswordUpdate} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
