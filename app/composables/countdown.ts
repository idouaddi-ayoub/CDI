import { ref, computed, onMounted, onUnmounted } from "vue";

export function useCountdown(targetDate: Date) {
  const now = ref(new Date());
  let intervalId: NodeJS.Timeout | null = null;

  // The total time remaining in milliseconds.
  const timeRemaining = computed(() => {
    return targetDate.getTime() - now.value.getTime();
  });

  // Reactive properties for the countdown.
  const days = computed(() =>
    Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24))
  );
  const hours = computed(() =>
    Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = computed(() =>
    Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = computed(() =>
    Math.floor((timeRemaining.value % (1000 * 60)) / 1000)
  );
  const isFinished = computed(() => timeRemaining.value <= 0);

  // Function to update the time.
  const updateTime = () => {
    now.value = new Date();
    if (isFinished.value) {
      clearInterval(intervalId as NodeJS.Timeout);
    }
  };

  // Start the timer when the component is mounted.
  onMounted(() => {
    intervalId = setInterval(updateTime, 1000);
  });

  // Clear the timer when the component is unmounted to prevent memory leaks.
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return {
    days,
    hours,
    minutes,
    seconds,
    isFinished,
  };
}
