<script setup lang="ts">
import { signIn } from "~~/layers/auth/app/lib/auth-client";

const signInSocial = async () => {
    await signIn.social({ provider: "google", callbackURL: "/members" });
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md">
            <UCard :ui="{ header: 'border-b-0', body: 'border-b-0' }">
                <template #header>
                    <img src="~/assets/png/CDI.png" class="w-64 mx-auto" />
                    <div class="text-center space-y-2">
                        <h1 class="text-xl font-semibold text-black">login</h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            appah
                        </p>
                    </div>
                </template>

                <div class="flex flex-col gap-4">
                    <UButton
                        block
                        color="secondary"
                        size="lg"
                        icon="i-simple-icons-google"
                        @click="signInSocial"
                        class="cursor-pointer"
                    >
                        continue with google
                    </UButton>
                </div>

                <template #footer>
                    <p class="text-center text-xs text-gray-500">
                        By continuing you agree to the terms and privacy policy.
                    </p>
                </template>
            </UCard>
        </div>
    </div>
</template>
