const entityNotFound = {
    status: 404,
    message: "Entity couldn't be found",
    data: null,
    error: "The 'entityId' is not recognized as a valid entity"
};

const settingsNotFound = {
    status: 404,
    message: "Settings couldn't be found",
    data: null,
    error: "The 'settingsId' is not recognized as a valid entity"
};

const alreadyBookmarked= {
    status: 403,
    message: "This was already bookmarked by you",
    data: null,
    error: "This item was already bookmarked by this player"
}

const bookmarkNotFound = {
    status: 404,
    message: "Like couldn't be found",
    data: null,
    error: "The 'likeId' is not recognized as a valid entity"
}

const sessionNotFound = {
    status: 404,
    message: "Session couldn't be found",
    data: null,
    error: "The 'sessionId' is not recognized as a valid entity"
};

const orderNotFound = {
    status: 404,
    message: "Order couldn't be found",
    data: null,
    error: "The 'orderId' is not recognized as a valid entity"
};

const checkInNotFound = {
    status: 404,
    message: "CheckIn couldn't be found",
    data: null,
    error: "The 'checkInId' is not recognized as a valid entity"
};


const userNotAuthorized = {
    status: 403,
    message: "not authorized",
    data: null,
    error: "You are not authorized to make this request"
}

const userNotFound = {
    status: 403,
    message: "not authorized",
    data: null,
    error: "The 'useerId' is not recognized as a valid entity"
}

const productNotFound = {
    status: 404,
    message: "Product couldn't be found",
    data: null,
    error: "The 'productId' is not recognized as a valid entity"
}

const cantDeleteMembership = {
    status: 405,
    message: "Can't Delete Membership",
    data: null,
    error: "You can't delete your membership for a team you created"
}

const membershipNotFound = {
    status: 404,
    message: "Membership couldn't be found",
    data: null,
    error: "The memberhsip doesn't exist between that player and team"
}

const membershipAlreadyExists = {
    status: 403,
    message: "Membership already exists",
    data: null,
    error: "A memberhsip already exist between that player and team"
}

module.exports = {
    entityNotFound,
    settingsNotFound,
    alreadyBookmarked,
    bookmarkNotFound,
    sessionNotFound,
    orderNotFound,
    productNotFound,
    userNotFound,
    cantDeleteMembership,
    membershipNotFound,
    membershipAlreadyExists,
    userNotAuthorized,
    checkInNotFound
}