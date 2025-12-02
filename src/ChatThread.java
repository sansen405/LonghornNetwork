import java.util.concurrent.Semaphore;

/**
 * THREAD THAT HANDLES SENDING CHAT MESSAGES BETWEEN STUDENTS
 */
public class ChatThread implements Runnable {
    private UniversityStudent sender;
    private UniversityStudent receiver;
    private String message;
    // Static semaphore to ensure thread-safe chat operations.
    private static final Semaphore semaphore = new Semaphore(1);

    /**
     * CREATES A NEW CHAT THREAD
     * @param sender THE STUDENT SENDING THE MESSAGE
     * @param receiver THE STUDENT RECEIVING THE MESSAGE
     * @param message THE MESSAGE TO SEND
     */
    public ChatThread(UniversityStudent sender, UniversityStudent receiver, String message) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }

    /**
     * RUNS THE CHAT THREAD TO SEND A MESSAGE
     */
    @Override
    public void run() {
        try {
            semaphore.acquire();
            // Simulate sending a chat message. A real implementation would update a shared chat history.
            System.out.println("Chat (Thread-Safe): " + sender.name + " to " + receiver.name + ": " + message);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Chat interrupted: " + e.getMessage());
        } finally {
            semaphore.release();
        }
    }
}
