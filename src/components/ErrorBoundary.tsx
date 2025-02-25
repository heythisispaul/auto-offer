import { Component } from "preact";
import { ClaimError } from "@/features/offer-claim/components";
import { type Children } from "@/types";

export class ErrorBoundary extends Component<{ children: Children }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
    this.setState({ error: true });
  }

  render() {
    if (this.state.hasError) {
      return <ClaimError />;
    }

    return this.props.children;
  }
}
