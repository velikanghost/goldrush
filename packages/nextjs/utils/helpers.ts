export const formatSUIBalance = (value: string) => {
  const number = Number(value);
  return number / 1_000_000_000;
};

export const extractTokenName = (coinType: string): string => {
  const parts = coinType.split("::");
  return parts[parts.length - 1];
};

export const shortenAddress = (address: string): string => {
  const formatted = `${address?.substring(0, 8)}...${address?.substring(60)}`;
  return formatted;
};

// const { sendTransactionAsync, data, error: sendTxError, isError: isSendTxError } = useSendTransaction();

// const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
//   hash: data,
// });

// const { data: greeting } = useScaffoldReadContract({
//   contractName: "YourContract",
//   functionName: "greeting",
// });

// const { writeContractAsync } = useScaffoldWriteContract({
//   contractName: "YourContract",
// });

// const handleSend = useCallback(async () => {
//   if (!connectedAddress) return;

//   try {
//     setIsFetching(true);
//     setTxResults([]);

//     switchChain({ chainId: monadTestnet.id });

//     const tx = await sendTransactionAsync({
//       to: connectedAddress,
//       value: parseEther("0.0001"),
//     });

//     setTxResults([tx]);
//     notification.success("Transaction sent");
//   } catch (error) {
//     console.error("Error sending transaction:", error);
//     notification.error("Error sending transaction");
//     setIsFetching(false);
//   } finally {
//     setIsFetching(false);
//   }
// }, [connectedAddress, sendTransactionAsync]);

// const sendNotification = useCallback(async () => {
//   if (!user) {
//     console.log("No user available");
//     return;
//   }

//   setIsWaiting(true);
//   setSendNotificationResult("");

//   try {
//     const response = await sendFrameNotification({
//       fid: Number(user.fid),
//       title: "Test Notification",
//       body: "This is a test notification",
//     });

//     setIsWaiting(false);

//     switch (response.state) {
//       case "error":
//         setSendNotificationResult(`Error: ${response.error}`);
//         break;
//       case "rate_limit":
//         setSendNotificationResult("Rate limited - please try again later");
//         break;
//       case "no_token":
//         setSendNotificationResult("Notification token is invalid - please re-enable notifications");
//         break;
//       case "success":
//         setSendNotificationResult("Success");
//         break;
//     }
//   } catch (error) {
//     setSendNotificationResult(`Error: ${error}`);
//     console.log("Error sending notification:", error);
//     setIsWaiting(false);
//   }
// }, [user]);

// const handleViewProfile = async () => {
//   if (!username) return;
//   try {
//     const user = await fetchUserByUsername(username);
//     await sdk.actions.viewProfile({ fid: Number(user.fid) });
//   } catch (error) {
//     notification.error("Failed to view profile");
//   }
// };

// const updateGreeting = useCallback(async () => {
//   if (!value) {
//     notification.error("Please enter a value");
//     return;
//   }

//   switchChain({ chainId: monadTestnet.id });

//   try {
//     await writeContractAsync(
//       {
//         functionName: "setGreeting",
//         args: [value],
//         value: parseEther("0.0001"),
//       },
//       {
//         onSuccess: tx => {
//           notification.success("Greeting updated");
//           setTxResults([tx]);
//         },
//       },
//     );
//   } catch (error) {
//     console.error("Error updating greeting:", error);
//     notification.error("Error updating greeting");
//   }
// }, [value, writeContractAsync]);
