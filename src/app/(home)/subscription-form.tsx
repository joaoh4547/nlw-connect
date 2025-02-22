"use client"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { subscribeToEvent } from "@/http/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Mail, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const subscriptionSchema = z.object({
    name: z.string().min(2, "Digite seu nome completo"),
    email: z.string().email("Digite um e-mail valido"),
})

type SubscriptionSchema = z.infer<typeof subscriptionSchema>

export function SubscriptionForm() {
    const { push } = useRouter()
    const search = useSearchParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubscriptionSchema>({
        resolver: zodResolver(subscriptionSchema),
    })

    async function handleSubscribe({ email, name }: SubscriptionSchema) {
        const referrer = search.get("referrer")
        const { subscriberId } = await subscribeToEvent({
            email,
            name,
            referrer,
        })
        push(`/invite/${subscriberId}`)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSubscribe)}
            className="bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]"
        >
            <h2 className="font-heading font-semibold text-gray-200 text-xl">
                Inscrição
            </h2>
            <div className="space-y-3">
                <div className="space-y-2">
                    <Input.Root>
                        <Input.Icon>
                            <User />
                        </Input.Icon>
                        <Input.Field
                            type="text"
                            placeholder="Nome Completo"
                            {...register("name")}
                        />
                    </Input.Root>
                    {errors.name && (
                        <p className="text-danger text-xs font-semibold">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Input.Root>
                        <Input.Icon>
                            <Mail />
                        </Input.Icon>
                        <Input.Field
                            type="email"
                            placeholder="E-mail"
                            {...register("email")}
                        />
                    </Input.Root>
                    {errors.email && (
                        <p className="text-danger text-xs font-semibold">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>
            <Button type="submit">
                Confirmar
                <ArrowRight />
            </Button>
        </form>
    )
}
