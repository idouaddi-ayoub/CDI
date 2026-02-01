<script setup lang="ts">
import { UContainer, UInput } from "#components";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Database } from "../../types/supabase";

import * as z from "zod";

const supabase = useSupabaseClient<Database>();

const schema = z.object({
  fullName: z
    .string("Please enter your full name")
    .min(3, "Please enter your full name"),
  email: z.email("Invalid email address"),
  phoneNumber: z
    .string({ message: "phone is required" })
    .transform((value) =>
      value.startsWith("0") ? "+212" + value.slice(1) : value
    )
    .refine(
      (value) => /^(?:\+212)(6|7)\d{8}$/.test(value),
      "Please enter a valid Moroccan phone number with no spaces"
    ),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  fullName: "",
  email: "",
  phoneNumber: "",
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData = event.data;

  const phone = formData.phoneNumber.trim();

  const { data: existingRows, error: checkError } = await supabase
    .from("EDAY")
    .select("id")
    .eq("phoneNumber", phone);

  if (checkError) {
    toast.add({
      title: "Error checking phone number",
      description: checkError.message,
      color: "error",
    });
    return;
  }

  if (existingRows && existingRows.length > 0) {
    toast.add({
      title: "Already Registered",
      description: "This phone number is already registered.",
      color: "warning",
    });
    return;
  }

  const { error: insertError } = await supabase.from("EDAY").insert([
    {
      fullName: formData.fullName,
      phoneNumber: phone,
      email: formData.email,
    },
  ]);

  if (insertError) {
    toast.add({
      title: "Error submitting form",
      description: "Form already submited. Thank you !",
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Success",
    description: "Your form has been submitted successfully!",
    color: "primary",
  });

  Object.assign(state, {
    fullName: "",
    email: "",
    phoneNumber: "",
    day: "",
    time: "",
  });
}

const showCard = ref(false);
const open = ref(false);

onMounted(() => {
  setTimeout(() => {
    showCard.value = true;
  }, 1000);
});
</script>
<template>
  <UContainer v-if="showCard" class="flex flex-col items-center gap-10 pb-12">
    <UButton
      size="xl"
      @click="open = true"
      class="relative px-10 py-5 rounded-2xl font-semibold cursor-pointer text-black bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <span class="relative z-10">Get your E-DAY ticket</span>
      <span
        class="absolute inset-0 rounded-2xl bg-green-400/30 blur-xl opacity-0 hover:opacity-100 transition"
      />
    </UButton>

    <UModal
      v-model:open="open"
      class="bg-black/90 backdrop-blur-xl border border-white/10 animate-[scale-in_0.25s_ease-out] rounded-3xl shadow-2xl sm:scale-150 overflow-hidden"
    >
      <template #header>
        <div class="space-y-1 text-center w-full">
          <h2 class="text-2xl font-semibold text-white">
            Get your E-DAY ticket
          </h2>
          <p class="text-sm text-gray-400">Join the experience</p>
        </div>
      </template>

      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="flex flex-col gap-6"
          @submit="onSubmit"
        >
          <UFormField
            label="Full name"
            name="fullName"
            :ui="{ label: 'text-sm text-gray-300' }"
          >
            <UInput
              v-model="state.fullName"
              placeholder="John Doe"
              size="lg"
              class="bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition w-full"
            />
          </UFormField>

          <UFormField
            label="Phone number"
            name="phoneNumber"
            :ui="{ label: 'text-sm text-gray-300' }"
          >
            <UInput
              v-model="state.phoneNumber"
              placeholder="+212 or 07 or 06"
              size="lg"
              class="bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition w-full"
              @input="
                state.phoneNumber = state.phoneNumber.replace(/[^0-9+]/g, '')
              "
            />
          </UFormField>

          <UFormField
            label="Email address"
            name="email"
            :ui="{ label: 'text-sm text-gray-300' }"
          >
            <UInput
              v-model="state.email"
              placeholder="example@email.com"
              size="lg"
              class="bg-white/5 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            size="lg"
            block
            class="mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl py-4 shadow-lg hover:shadow-green-500/40 active:scale-[0.98] transition-all"
          >
            Submit
          </UButton>
        </UForm>
      </template>
    </UModal>
  </UContainer>
</template>
