<script setup lang="ts">
import { UContainer, UInput } from "#components";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Database } from "../../../types/supabase";

import * as z from "zod";

const supabase = useSupabaseClient<Database>();

const schema = z.object({
  fullName: z.string().optional(),
  email: z.email("Invalid email address"),
  phoneNumber: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  fullName: undefined,
  email: undefined,
  phoneNumber: undefined,
  subject: undefined,
  message: undefined,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { fullName, email, phoneNumber, subject, message } = event.data;

  try {
    const { error } = await supabase.from("Contact").insert({
      fullName: fullName ?? null,
      email,
      phoneNumber: phoneNumber ?? null,
      subject,
      message,
    });

    if (error) {
      throw error;
    }

    toast.add({
      title: "Success",
      description: "Your message has been sent.",
      color: "success",
    });
  } catch (err: any) {
    toast.add({
      title: "Error",
      description: err.message,
      color: "error",
    });
    console.error(err);
  }
}
</script>
<template>
  <div
    class="relative flex justify-center items-center bg-gradient-to-b from-green-dark to-green-dark"
  >
    <div class="text-center font-bold sm:pt-20 sm:pb-20 pt-5 pb-10">
      <div class="text-3xl sm:text-7xl">
        Contact
        <span class="text-green-default">Us</span>
      </div>
      <p class="text-lg sm:text-2xl pt-5 font-light">
        <span class="md:block">
          Have questions or feedback? We'd love to hear from you.
        </span>
      </p>
      <UContainer
        class="flex flex-col sm:flex-row text-center sm:text-left justify-center md:items-center gap-10 mt-5 w-screen"
      >
        <div class="flex-1 flex-col text-lg font-light">
          <h1 class="text-2xl font-bold mt-5 mb-5">Contact Information</h1>
          <div class="flex flex-col justify-center md:block items-center gap-5">
            <div class="flex flex-col md:flex-row">
              <div class="flex flex-col justify-center items-center">
                <UIcon
                  name="solar:map-point-broken"
                  class="size-5 text-green-700"
                />
              </div>
              <UContainer
                class="flex-col justify-center items-center md:block text-lg"
              >
                <h1 class="font-bold">Address</h1>
                <span> ENCG Agadir, Morocco</span>
              </UContainer>
            </div>

            <div class="flex flex-col md:flex-row">
              <div class="flex flex-col justify-center items-center">
                <UIcon
                  name="solar:letter-broken"
                  class="size-5 text-green-700"
                />
              </div>
              <UContainer
                class="flex-col justify-center items-center md:block text-lg"
              >
                <h1 class="font-bold">Email</h1>
                <span>cdiencga.info@gmail.com</span>
              </UContainer>
            </div>
            <div class="flex flex-col md:flex-row">
              <div class="flex flex-col justify-center items-center">
                <UIcon
                  name="solar:phone-broken"
                  class="size-5 text-green-700"
                />
              </div>
              <UContainer
                class="flex-col justify-center items-center md:block text-lg"
              >
                <h1 class="font-bold">Phone</h1>
                <span> +212 6-59-41-97-05</span>
              </UContainer>
            </div>
          </div>
        </div>
        <UForm
          :schema="schema"
          :state="state"
          class="flex-1 bg-[#011006] rounded-2xl border-2 border-green-500 p-4"
          @submit="onSubmit"
        >
          <div class="border-b-2 border-green-500">
            <h1 class="text-green-default text-2xl p-2">Send Us A Message</h1>
          </div>
          <div class="flex flex-col gap-3 pt-4 text-left text-lg">
            <UFormField
              label="Full Name"
              name="fullName"
              class="flex flex-col gap-2"
              :ui="{ label: 'text-sm font-medium' }"
            >
              <UInput
                v-model="state.fullName"
                placeholder="Type your name"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Email*"
              name="email"
              class="flex flex-col gap-2"
              :ui="{ label: 'text-sm font-medium' }"
            >
              <UInput
                v-model="state.email"
                placeholder="Type your Email"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Phone Number"
              name="phoneNumber"
              class="flex flex-col gap-2"
              :ui="{ label: 'text-sm font-medium' }"
            >
              <UInput
                v-model="state.phoneNumber"
                placeholder="Type your Phone Number"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Subject*"
              name="subject"
              class="flex flex-col gap-2"
              :ui="{ label: 'text-sm font-medium' }"
            >
              <UInput
                v-model="state.subject"
                placeholder="Type your Subject"
                class="w-full"
              />
            </UFormField>
            <UFormField
              label="Message*"
              name="message"
              class="flex flex-col gap-2"
              :ui="{ label: 'text-sm font-medium' }"
            >
              <UTextarea
                v-model="state.message"
                placeholder="Type your Message"
                class="w-full"
                :rows="6"
              />
            </UFormField>
            <div class="pt-4">
              <UButton type="submit" class="rounded-lg"> Send Message </UButton>
            </div>
          </div>
        </UForm>
      </UContainer>
    </div>
  </div>
</template>
