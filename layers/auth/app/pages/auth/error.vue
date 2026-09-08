<script setup lang="ts">
import { signIn } from "../../lib/auth-client";

const route = useRoute();

const signInSocial = async () => {
    await signIn.social({
        provider: "google",
    });
};
const error =
    typeof route.query.error === "string"
        ? decodeURIComponent(route.query.error).replaceAll("_", " ")
        : "You are not allowed to sign in with this account.";
</script>

<template>
    <div
        class="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-brpx-6"
    >
        <div class="absolute inset-0 opacity-40">
            <div
                class="absolute left-1/2 -top-30 h-80 w-[320px] -translate-x-1/2 rounded-full blur-3xl"
            />
            <div
                class="absolute -bottom-25 -right-15 h-65 w-65 rounded-full bg-primary/10 blur-3xl"
            />
        </div>

        <UCard
            class="relative z-10 w-full max-w-lg rounded-3xl border border-white/60 shadow-2xl backdrop-blur"
        >
            <template #header>
                <div class="flex flex-col items-center text-center">
                    <div
                        class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-sm"
                    >
                        <span class="text-3xl">✕</span>
                    </div>

                    <UBadge color="error" variant="soft" class="mb-3">
                        Access Denied
                    </UBadge>

                    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
                        Sign-in blocked
                    </h1>

                    <p class="mt-2 text-sm text-gray-500">
                        This Google account is not approved for access.
                    </p>
                </div>
            </template>

            <div class="space-y-4 text-center">
                <div class="rounded-2xl border border-red-100 bg-red-50/80 p-4">
                    <p class="text-sm leading-6 text-red-700">
                        {{ error }}
                    </p>
                </div>

                <p class="text-sm leading-6 text-gray-500">
                    Try signing in with an approved employee account, or contact
                    your administrator if you think this is a mistake.
                </p>
            </div>

            <template #footer>
                <div class="flex flex-col gap-3 sm:flex-row">
                    <UButton
                        block
                        color="primary"
                        to="/"
                        class="justify-center rounded-xl"
                    >
                        Back to home
                    </UButton>

                    <UButton
                        @click="signInSocial"
                        block
                        variant="outline"
                        class="justify-center rounded-xl"
                    >
                        Try another account
                    </UButton>
                </div>
            </template>
        </UCard>
    </div>
</template>
