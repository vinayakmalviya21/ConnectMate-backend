const User = require('../models/User.model');
const FriendRequest = require('../models/FriendRequest.model');

// Send Friend Request
const sendFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: 'User not found' });

    const request = new FriendRequest({ sender: sender._id, receiver: receiver._id });
    await request.save();

    res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Accept/Reject Friend Request
const updateFriendRequest = async (req, res) => {
  const { requestId, status } = req.body;
  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await request.save();

    if (status === 'accepted') {
      const sender = await User.findById(request.sender);
      const receiver = await User.findById(request.receiver);

      sender.friends.push(receiver._id);
      receiver.friends.push(sender._id);

      await sender.save();
      await receiver.save();
    }

    res.status(200).json({ message: `Friend request ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendFriendRequest, updateFriendRequest };
