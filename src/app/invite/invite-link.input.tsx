"use client"

import { IconButton } from "@/components/icon-button"
import { Input } from "@/components/input"
import { Copy, Link } from "lucide-react"

interface InviteLinkInputProps {
    inviteLink: string
}

export function InviteLinkInput({ inviteLink }: InviteLinkInputProps) {
    function copyInviteLink() {
        navigator.clipboard.writeText(inviteLink)
    }
    return (
        <Input.Root>
            <Input.Icon>
                <Link className="size-5" />
            </Input.Icon>
            <Input.Field readOnly defaultValue={inviteLink} />
            <IconButton className="-mr-2" onClick={copyInviteLink}>
                <Copy className="size-5" />
            </IconButton>
        </Input.Root>
    )
}
