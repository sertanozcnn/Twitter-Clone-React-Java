export const isSavedByReqUser = (reqUserId, post) => {
    for (let user of post.savedByUsers) {
        if (reqUserId === user.id) {
            return true; // Kullanıcı gönderiyi kaydetmiş
        }
    }
    return false; // Kullanıcı gönderiyi kaydetmemiş
}
