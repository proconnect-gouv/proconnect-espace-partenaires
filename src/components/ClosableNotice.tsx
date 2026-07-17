"use client";
import Notice, { NoticeProps } from "@codegouvfr/react-dsfr/Notice";
import { useEffect, useState } from "react";

export function ClosableNotice({ id: noticeId, ...props }: NoticeProps & { id: string }) {
  useEffect(() => {
    const storedIsClosed = localStorage?.getItem(`closable-notice-closed-${noticeId}`) === "true";
    setIsClosed(storedIsClosed);
  }, [noticeId]);

  const [isClosed, setIsClosed] = useState(true);
  return <Notice {...props} isClosed={isClosed} isClosable onClose={close} />;

  function close() {
    setIsClosed(true);
    localStorage?.setItem(`closable-notice-closed-${noticeId}`, "true");
  }
}
