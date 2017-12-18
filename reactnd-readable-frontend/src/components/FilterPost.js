import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories, setCategory, setSort } from '../actions'
import { Link } from 'react-router-dom'
import { ListGroupItem } from 'react-bootstrap'

class FilterPost extends Component {

  state = {
    categories: [],
    // show all posts by default
    currentCategory: "all",
    currentSortType: "Top Score"
    
  }
 
  componentDidMount() {
    this.props.loadCats();
  }

  setCat = (catName) => this.props.changeCat(catName)
  setSort = (sortType) => this.props.changeSort(sortType)

  handleClick(event) {
    event.preventDefault();
  }

  render() {

    const { categories, currentCategory, currentSortType } = this.props
    const sortTypes = ['Top Score', 'Most Recent']

    return (
      <div>
          <div className="cat-list">
          <h5><strong>Categories</strong></h5>
            {categories.map((cat, index) => (
              <ListGroupItem
                className={ currentCategory === cat.name ? "filter-link active" : "filter-link"}
                key={index}
                onClick={this.setCat.bind(this, cat.name)}>
                <Link to={cat.path} className="category-name">
                  {cat.name}
                </Link>
              </ListGroupItem>
            ))}
        </div>
        <h5 className="order-title"><strong>Sort posts by</strong></h5>
        <div className="sort-list">
          {sortTypes.map((sortType, index) => (
            <ListGroupItem className={ currentSortType === sortType ? "filter-link active" : "filter-link"}
              key={index} onClick={this.setSort.bind(this, `${sortType}`)}>
              <a href="#" onClick={this.handleClick}>{sortType}</a>
            </ListGroupItem>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    currentCategory: state.listState.category,
    currentSortType: state.listState.sortType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCats: () => dispatch(loadCategories()),
    changeCat: (category) => dispatch(setCategory(category)),
    changeSort: (sortType) => dispatch(setSort(sortType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPost)
