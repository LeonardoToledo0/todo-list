import type { Metadata } from "next";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import SessionRestore from "@/shared/middleware/SessionRestore";

export const metadata: Metadata = {
  title: "TaskMaster App",
  description: "Organize suas tarefas com estilo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Toaster position="top-right" />
        <SessionRestore />
        {children}
      </body>
    </html>
  );
}
