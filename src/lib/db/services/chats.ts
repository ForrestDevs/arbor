import "server-only";

import prisma from "../index";
import { Chat } from "@prisma/client";
import { Message } from "ai";

// CREATE

/**
 * **DATABASE SERVICE**
 *
 * Adds a new chat to the database.
 *
 * @param {Chat} chat - The chat data to be added.
 * @returns {Promise<Chat | null>} The newly created chat or null if creation failed.
 */
export const addChat = async (chat: Chat): Promise<Chat | null> => {
  return prisma.chat.create({
    data: {
      id: chat.id,
      messages: chat.messages as any,
      tagLine: chat.tagLine,
      userId: chat.userId,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    },
  });
};

// READ

/**
 * **DATABASE SERVICE**
 *
 * Retrieves a chat by its ID and user ID.
 *
 * @param {Chat["id"]} id - The ID of the chat to retrieve.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @returns {Promise<Chat | null>} The retrieved chat or null if not found.
 */
export const getChat = async (
  id: Chat["id"],
  userId: Chat["userId"]
): Promise<Chat | null> => {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id, userId },
    });

    if (!chat) {
      return null;
    }

    return {
      ...chat,
      messages: chat.messages as any,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return null;
  }
};

/**
 * **DATABASE SERVICE**
 *
 * Finds all chats for a user.
 *
 * @param {Chat["userId"]} userId - The user ID to search for.
 * @returns {Promise<Chat[]>} An array of chats matching the criteria.
 */
export const findChatsByUser = async (
  userId: Chat["userId"]
): Promise<Chat[]> => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    if (!chats) {
      return [];
    }

    return chats.map((chat) => ({
      ...chat,
      messages: chat.messages as any,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return [];
  }
};

// UPDATE

/**
 * **DATABASE SERVICE**
 *
 * Updates a chat's tagline.
 *
 * @param {Chat["id"]} id - The ID of the chat to update.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @param {string} tagline - The new tagline for the chat.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const updateChatTagline = async (
  id: Chat["id"],
  userId: Chat["userId"],
  tagline: string
): Promise<boolean> => {
  const chat = await prisma.chat.update({
    where: { id, userId },
    data: { tagLine: tagline },
  });

  return !!chat;
};

/**
 * **DATABASE SERVICE**
 *
 * Adds a new message to an existing chat.
 *
 * @param {Chat["id"]} id - The ID of the chat to update.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @param {ChatMessage} message - The message to be added to the chat.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const addMessageToChat = async (
  id: Chat["id"],
  userId: Chat["userId"],
  message: Message
): Promise<boolean> => {
  const chat = await prisma.chat.update({
    where: { id, userId },
    data: { messages: { push: message as any } },
  });

  return !!chat;
};

/**
 * **DATABASE SERVICE**
 *
 * Updates a chat's messages.
 *
 * @param {Chat["id"]} id - The ID of the chat to update.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @param {Message[]} messages - The new messages.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const updateChatMessages = async (
  id: Chat["id"],
  userId: Chat["userId"],
  messages: Message[]
): Promise<boolean> => {
  const chat = await prisma.chat.update({
    where: { id, userId },
    data: { messages: messages as any },
  });

  return !!chat;
};

// DELETE

/**
 * **DATABASE SERVICE**
 *
 * Deletes a chat from the database.
 *
 * @param {Chat["id"]} id - The ID of the chat to delete.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
 */
export const deleteChat = async (
  id: Chat["id"],
  userId: Chat["userId"]
): Promise<boolean> => {
  const chat = await prisma.chat.delete({
    where: { id, userId },
  });

  return !!chat;
};
