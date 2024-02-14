import { useState, useRef, useEffect } from "react";

import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatServices";

import Message from "./Message";