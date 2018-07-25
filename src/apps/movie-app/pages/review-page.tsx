import * as React from 'react';

import { HttpClient } from 'lupa/utils/http-client';
import { RouteComponentProps } from 'react-router-dom';
import { API_KEY } from '../domains/api';

import { Review } from '../domains/review';
import { ReviewCard } from '../components/review-card';

interface ReviewPageProps extends RouteComponentProps<any>, React.Props<any> { }
interface ExplorePageState {
  reviews: Review[];
}
export class ReviewPage extends React.Component<ReviewPageProps, ExplorePageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      reviews: null,
    };
  }

  componentDidMount() {
    this.fetchReviews();
  }

  fetchReviews() {
    if (this.state.reviews) {
      return;
    }
    const endpoint = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/reviews`;

    HttpClient.getInstance().fetch(endpoint, { api_key: API_KEY })
      .then((data: any) => this.onFetchReviewsDone(data))
      .catch();
  }

  onFetchReviewsDone(data: any) {
    const reviews = Review.createCollectionFromResponse(data.results, 3);
    this.setState({ reviews: [...reviews] });
  }

  onClickItem(id: number) {
    this.props.history.push(`/detail/${id}`);
  }

  renderReviews() {
    const { reviews } = this.state;
    if (!reviews) {
      return;
    }
    const reviewsCard = reviews
      .map((review: Review, index: number) => <ReviewCard
        key={index}
        avatar={review.getAuthorAvatar()}
        content={review.content}
        author={review.author}
      />);

    return reviewsCard;
  }

  render() {
    return (
      <div className="row">
        {this.renderReviews()}
      </div>
    );
  }
}
