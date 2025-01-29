const User = require('../models/User.model');

// Get mutual friends
const getMutualFriends = (userId, otherUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(userId).populate('friends');
      const otherUser = await User.findById(otherUserId).populate('friends');

      const mutualFriends = user.friends.filter(friend =>
        otherUser.friends.includes(friend._id)
      );
      resolve(mutualFriends);
    } catch (error) {
      reject(error);
    }
  });
};

// Recommend friends based on mutual friends
const recommendFriends = async (userId) => {
  try {
    const user = await User.findById(userId).populate('friends');
    const allUsers = await User.find({ _id: { $ne: userId } });

    let recommendations = [];

    for (let otherUser of allUsers) {
      const mutualFriends = await getMutualFriends(userId, otherUser._id);
      if (mutualFriends.length > 0) {
        recommendations.push({ user: otherUser, mutualFriends });
      }
    }

    return recommendations;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting friend recommendations');
  }
};

module.exports = { recommendFriends };
