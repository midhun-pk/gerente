import { expect } from 'chai';
import makeComment from './';
import makeFakeComment from '../utils/fixtures/comment';

describe('comment', () => {
    it('must have an author', () => {
        const comment = makeFakeComment({ author: null });
        expect(() => makeComment(comment)).to.throw('Comment must have an author.');
    });
    it('must have a valid post id', () => {
        const comment = makeFakeComment({ postId: null });
        expect(() => makeComment(comment)).to.throw('Comment must contain a postId.');
    });
    it('must have valid text', () => {
        const comment = makeFakeComment({ text: null });
        expect(() => makeComment(comment)).to.throw(
          'Comment must include at least one character of text.'
        );
    });
    it('can be in reply to another comment', () => {
        const comment = makeFakeComment({ replyToId: 'invalid' });
        expect(() => makeComment(comment)).to.throw(
          'If supplied. Comment must contain a valid replyToId.'
        );
        const notInReply = makeFakeComment({ replyToId: undefined });
        expect(() => makeComment(notInReply)).not.to.throw();
    });
    it('can have an id', () => {
        const comment = makeFakeComment({ id: 'invalid' });
        expect(() => makeComment(comment)).to.throw('Comment must have a valid id.');
        const noId = makeFakeComment({ id: undefined });
        expect(() => makeComment(noId)).not.to.throw();
    });
    it('can create an id', () => {
        const noId = makeFakeComment({ id: undefined });
        const comment = makeComment(noId);
        expect(comment.getId()).not.to.be.undefined;
    });
    it('can be published', () => {
        const unpublished = makeFakeComment({ published: false });
        const comment = makeComment(unpublished);
        expect(comment.isPublished()).to.be.false;
        comment.publish();
        expect(comment.isPublished()).to.be.true;
    });
    it('can be unpublished', () => {
        const published = makeFakeComment({ published: true });
        const comment = makeComment(published);
        expect(comment.isPublished()).to.be.true;
        comment.unPublish();
        expect(comment.isPublished()).to.be.false;
    });
    it('is createdOn now in UTC', () => {
        const noCreationDate = makeFakeComment({ createdOn: undefined });
        expect(noCreationDate.createdOn).to.be.undefined;
        const date = makeComment(noCreationDate).getCreatedOn();
        expect(date).not.to.be.undefined;
        expect(new Date(date).toUTCString().substring(26)).to.be.string('GMT');
    });
    it('is modifiedOn now in UTC', () => {
        const noModifiedOnDate = makeFakeComment({ modifiedOn: undefined });
        expect(noModifiedOnDate.modifiedOn).to.be.undefined;
        const date = makeComment(noModifiedOnDate).getCreatedOn();
        expect(date).not.to.be.undefined;
        expect(new Date(date).toUTCString().substring(26)).to.be.string('GMT');
    });
    it('sanitizes its text', () => {
        const sane = makeComment({
          ...makeFakeComment({ text: '<p>This is fine</p>' })
        });
        const insane = makeComment({
          ...makeFakeComment({
            text: '<script>This is not so fine</script><p>but this is ok</p>'
          })
        });
        const totallyInsane = makeFakeComment({
          text: '<script>All your base are belong to us!</script>'
        });
    
        expect(sane.getText()).to.be.string('<p>This is fine</p>');
        expect(insane.getText()).to.be.string('<p>but this is ok</p>');
        expect(() => makeComment(totallyInsane)).to.throw(
          'Comment contains no usable text.'
        );
    });
    it('can be marked deleted', () => {
        const fake = makeFakeComment();
        const c = makeComment(fake);
        c.markDeleted();
        expect(c.isDeleted()).to.be.true;
        expect(c.getText()).to.be.string('.xX This comment has been deleted Xx.');
        expect(c.getAuthor()).to.be.string('deleted');
    });
    it('includes a hash', () => {
        const fakeComment = {
          author: 'Bruce Wayne',
          text: 'I\'m batman.',
          postId: 'cjt65art5350vy000hm1rp3s9',
          published: true,
          source: { ip: '127.0.0.1' }
        };
        expect(makeComment(fakeComment).getHash()).to.be.string(
          '7bb94f070d9305976b5381b7d3e8ad8a'
        );
    });
    it('must have a source', () => {
        const noSource = makeFakeComment({ source: undefined });
        expect(() => makeComment(noSource)).to.throw('Comment must have a source.');
    });
    it('must have a source ip', () => {
        const noIp = makeFakeComment({ source: { ip: undefined } });
        expect(() => makeComment(noIp)).to.throw(
          'Comment source must contain an IP.'
        );
    });
    it('can have a source browser', () => {
        const withBrowser = makeFakeComment();
        expect(
          makeComment(withBrowser)
            .getSource()
            .getBrowser()
        ).to.be.string(withBrowser.source.browser);
        const withoutBrowser = makeFakeComment({ source: { ip: '127.0.0.1' } });
        expect(() => makeComment(withoutBrowser).getSource().getBrowser()).not.to.throw();
    });
    it('can have a source referrer', () => {
        const withReferrer = makeFakeComment();
        expect(
          makeComment(withReferrer)
            .getSource()
            .getReferrer()
        ).to.be.string(withReferrer.source.referrer);
        const withoutReferrer = makeFakeComment({ source: { ip: '127.0.0.1' } });
        expect(() => makeComment(withoutReferrer).getSource().getReferrer()).not.to.throw();
    });
});