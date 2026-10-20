import styles from "./ProfileSummary.module.css";
import Card from "@/shared/components/ui/Card/Card";
import Avatar from "@/shared/components/ui/Avatar/Avatar";
import { formatUserRole } from "@/utils/formatters";

const ProfileSummary = ({ profileData }) => {
  return (
    <Card variant="flat">
      <div className={styles.profileHeader}>
        <Avatar
          firstName={profileData.firstName}
          lastName={profileData.lastName}
          size="lg"
        />
        <div className={styles.profileInfo}>
          <h2>
            {profileData.firstName} {profileData.lastName}
          </h2>
          <span className={styles.roleText}>
            {formatUserRole(profileData.role)}
          </span>
          <span className={styles.emailText}>{profileData.email}</span>
          {profileData.station && (
            <span className={styles.stationText}>
              Station: {profileData.station.name}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileSummary;
