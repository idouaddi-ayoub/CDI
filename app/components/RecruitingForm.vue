<script setup lang="ts">
import * as z from "zod";
import type { Database } from "../../types/supabase";
import type { FormSubmitEvent } from "@nuxt/ui";

const supabase = useSupabaseClient<Database>();

const schema = z.object({
  fullName: z.string("Please enter a name"),
  phoneNumber: z.string("Please enter 10 numbers").min(10),
  day: z.string("Day is required").min(1),
  time: z.string("Time is required").min(1),
});

type Schema = z.infer<typeof schema>;

const state = reactive<Partial<Schema>>({
  fullName: undefined,
  phoneNumber: undefined,
  day: undefined,
  time: undefined,
});

const dayOptions = [
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
];

const timeOptions = [
  { label: "Morning", value: "morning" },
  { label: "Afternoon", value: "afternoon" },
];

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData = event.data;

  const phone = formData.phoneNumber.trim();

  const { data: existingRows, error: checkError } = await supabase
    .from("RecruitementForm")
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

  const { error: insertError } = await supabase
    .from("RecruitementForm")
    .insert([
      {
        fullName: formData.fullName,
        phoneNumber: phone,
        day: formData.day,
        time: formData.time,
      },
    ]);

  if (insertError) {
    toast.add({
      title: "Error submitting form",
      description: insertError.message,
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Success",
    description: "Your form has been submitted successfully!",
    color: "primary",
  });

  // 4️⃣ Clear fields only if successfully inserted
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
  <UContainer
    v-if="showCard"
    class="flex flex-col justify-center gap-6 pb-10 w-48"
  >
    <UButton
      label="Join Us"
      @click="open = true"
      size="xl"
      class="cursor-pointer text-center justify-center items-center sm:scale-150"
    />
    <UModal
      v-model:open="open"
      title="Fill the the form below"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="flex-col space-y-4 justify-between items-center"
          @submit="onSubmit"
        >
          <UFormField
            label="fullName*"
            name="fullName"
            class="flex flex-col gap-2"
            :ui="{ label: 'text-sm font-medium' }"
          >
            <UInput
              v-model="state.fullName"
              placeholder="Type your full name"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Phone Number*"
            name="phoneNumber"
            class="flex flex-col gap-2"
            :ui="{ label: 'text-sm font-medium' }"
          >
            <UInput
              v-model="state.phoneNumber"
              placeholder="Type your phone number"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Day*"
            name="day"
            class="flex flex-col gap-2"
            :ui="{ label: 'text-sm font-medium' }"
          >
            <USelect
              v-model="state.day"
              :items="dayOptions"
              placeholder="Select a day"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Time*"
            name="time"
            class="flex flex-col gap-2"
            :ui="{ label: 'text-sm font-medium' }"
          >
            <USelect
              v-model="state.time"
              :items="timeOptions"
              placeholder="Select a time"
              class="w-full"
            />
          </UFormField>
          <UButton
            class="flex h-fit items-center justify-center"
            type="submit"
            label="Submit"
          />
        </UForm>
      </template>
    </UModal>
  </UContainer>
</template>
