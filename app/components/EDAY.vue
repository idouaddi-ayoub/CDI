<script setup lang="ts">
import { UContainer, UInput } from "#components";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Database } from "../../types/supabase";

import * as z from "zod";

const supabase = useSupabaseClient<Database>();

const schema = z.object({
  email: z.email("Invalid email address"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  email: "",
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData = event.data;

  const email = formData.email;

  const { data: existingRows, error: checkError } = await supabase
    .from("EDAY")
    .select("id")
    .eq("email", email);

  if (checkError) {
    toast.add({
      title: "Error checking email",
      description: checkError.message,
      color: "error",
    });
    return;
  }

  if (existingRows && existingRows.length > 0) {
    toast.add({
      title: "Already Registered",
      description: "This email is already registered.",
      color: "warning",
    });
    return;
  }

  const { error: insertError } = await supabase.from("EDAY").insert([
    {
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
    email: "",
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
      <span class="relative z-10">10 remaining Tickets</span>
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
            Get your free E-DAY ticket
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
