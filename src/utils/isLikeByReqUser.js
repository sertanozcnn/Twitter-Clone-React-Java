export const isLikedByReqUser = (reqUserId, post) => {
    for (let user of post.liked) {
        if (reqUserId === user.id) {
            return true; // Kullanıcı gönderiyi beğenmiş
        }
    }
    return false; // Kullanıcı gönderiyi beğenmemiş
}
