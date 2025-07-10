const User = require("../models/User")

const deleteUnverifiedUsers = async () => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // 10 mins ago

  try {
    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: tenMinutesAgo },
    });

    if (result.deletedCount > 0) {
      console.log(`[CRON] Deleted ${result.deletedCount} unverified users`);
    } else {
      console.log(`[CRON] No unverified users to delete`);
    }
  } catch (err) {
    console.error("[CRON ERROR] Failed to delete unverified users:", err);
  }
};

module.exports = deleteUnverifiedUsers;